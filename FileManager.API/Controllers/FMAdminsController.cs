using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FileManager.API.Data;
using FileManager.API.Dtos;
using FileManager.API.Helpers;
using FileManager.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FileManager.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FMAdminsController : ControllerBase
    {
        private readonly IFileManagerRepository _repo;
        private readonly IMapper _mapper;

        public FMAdminsController(IFileManagerRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;
           
        }

        [HttpGet("{id}", Name="GetFMAdmin")]
        public async Task<IActionResult> GetFMAdmin(int id)
        {
            var fmAdminfromRepo = await _repo.GetFMAdmin(id);

            var fmAdmin = _mapper.Map<FMAdminForListDto>(fmAdminfromRepo);

            return Ok(fmAdmin);
        }

        [HttpGet]
        public async Task<IActionResult> GetFMAdmins([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            userParams.UserId = currentUserId;
 
            var fmAdmins = await _repo.GetFMAdmins(userParams);
            var fmAdminsToReturn = _mapper.Map<IEnumerable<FMAdminForListDto>>(fmAdmins);
            Response.AddPagination(fmAdmins.CurrentPage,fmAdmins.PageSize,fmAdmins.TotalCount,fmAdmins.TotalPages);
            return Ok(fmAdminsToReturn);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFMAdmin(int id, FMAdminForUpdateDto fmAdminForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var fmAdminFromRepo = await _repo.GetFMAdmin(id);

            _mapper.Map(fmAdminForUpdateDto,fmAdminFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating File Manager Admin {id} failed on save");
        }
    }
}