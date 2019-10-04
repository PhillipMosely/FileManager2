using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FileManager.API.Data;
using FileManager.API.Dtos;
using FileManager.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        public CompanyController(IFileManagerRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanies([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
 
            var companies = await _repo.GetCompanies(userParams);
            var companiesToReturn = _mapper.Map<IEnumerable<CompanyForListDto>>(companies);
            Response.AddPagination(companies.CurrentPage,companies.PageSize,companies.TotalCount,companies.TotalPages);
            return Ok(companiesToReturn);
        }

        [HttpGet("{id}", Name="GetCompany")]
        public async Task<IActionResult> GetCompany(int id)
        {
            var company = await _repo.GetUser(id);
            var companyToReturn = _mapper.Map<CompanyForListDto>(company);
            return Ok(companyToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCompany(int id, CompanyForUpdateDto companyForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var companyFromRepo = await _repo.GetCompany(id);

            _mapper.Map(companyForUpdateDto,companyFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating Company {id} failed on save");
        }

    }
}