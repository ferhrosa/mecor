using System.Text.RegularExpressions;

namespace Mecor.Api.Cross
{
    public static class StringExtensions
    {
        /// <remarks>
        /// ^                         Start anchor
        /// (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
        /// (?=.*[!@#$&*])            Ensure string has one special case letter.
        /// (?=.*[0-9].*[0-9])        Ensure string has two digits.
        /// (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
        /// .{8}                      Ensure string is of length 8.
        /// $                         End anchor.
        /// </remarks>
        public const string PasswordStrengthPattern = "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$";

        public static string ToNormalizedEmail(this string email) => email?.ToLower().Trim();

        public static bool IsStrongPassword(this string password) => Regex.IsMatch(password, PasswordStrengthPattern);
    }
}
