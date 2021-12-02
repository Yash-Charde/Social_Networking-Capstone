using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Social_Networking.Models
{
    public class ApplicationUser : IdentityUser
    {
        /*[Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }*/
        public string FullName { get; set; }

        [DefaultValue(0)]
        public int Followers { get; set; }

        [DefaultValue(0)]
        public int Following { get; set; }

    }
}
