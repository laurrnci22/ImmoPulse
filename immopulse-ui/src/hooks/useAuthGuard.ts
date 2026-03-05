import {useEffect} from 'react';
import { isAuthenticated} from "../services/AuthService.ts";

export const useAuthGuard = () => {

  //  const authService = useMemo(() => new AuthService(), []);

    //const auth: AuthContextType | undefined = useContext(AuthContext);


    useEffect(() => {
        isAuthenticated().then((isAuthenticated) => {
            if (!isAuthenticated) {
                //auth?.handleTest();
            }
        });

    }, []);
};
