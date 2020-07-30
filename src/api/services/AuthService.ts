import { EchoPromise, EchoService, EchoServiceBuilder, GET } from "echofetch";
import { User } from "@/api/models/User";

/**
 * Service for managing authentication.
 */
class AuthService extends EchoService {
    /**
     * Get the logged in user.
     */
    @GET("/user")
    get(): EchoPromise<User> {
        return {} as EchoPromise<User>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(AuthService);
