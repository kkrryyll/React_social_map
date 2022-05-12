﻿using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface IAppUserService
    {
        Task<AppUserDTO> AddAsync(CreateAppUser user);
        Task<AppUserDTO> GetAsync(int id);
        Task<AppUserDTO> GetByUuidAsync(string uuid);
        Task<IEnumerable<AppUserDTO>> GetAllAsync();
    }
}
