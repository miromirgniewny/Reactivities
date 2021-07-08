using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,25}$", 
        ErrorMessage ="Password must contain at least one digit, one lower case letter, one upper case letter and be at least 4 characters long!")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}