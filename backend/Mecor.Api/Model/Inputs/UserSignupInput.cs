using Mecor.Api.Cross;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mecor.Api.Model.Inputs
{
    public class UserSignupInput
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(200)]
        public string Name { get; set; }

        [Required]
        //[RegularExpression(StringExtensions.PasswordStrengthPattern, ErrorMessage = "The password must be stronger.")]
        public string Password { get; set; }
    }
}
