import makeAuthService from "./authService";
import makeEncryptService from "./encryptService";

const encryptService = makeEncryptService();
const authService = makeAuthService({ encryptService });

export {
  authService
}
