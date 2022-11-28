import { toast } from 'react-toastify'

export function PasswordValidator(password) {
  if (
    !password.match(
      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/
    )
  ) {
    toast.error('Password is not strong enough.')
    if (!password.match(/(?=.*?[A-Z])/)) {
      toast.info('There should be at least one upper case letter.')
    }
    if (!password.match(/(?=.*?[a-z])/)) {
      toast.info('There should be at least one lower case letter.')
    }
    if (!password.match(/(?=.*?[0-9])/)) {
      toast.info('There should be at least one numeric value.')
    }
    if (!password.match(/(?=.*?[#?!@$%^&*-])/)) {
      toast.info('There should be at least one special character.')
    }
    if (!password.match(/.{8,}/)) {
      toast.info('Password length must be greater than 8 characters.')
    }
    return false
  }
  return true
}
