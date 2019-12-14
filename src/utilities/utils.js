import jwtDecode from 'jwt-decode';

export class Utils {
    static getAuthUser(token) {
        let decodedToken = jwtDecode(token);

        return {
            userId: decodedToken['user_id'],
            userName: decodedToken['user_name'],
            firstName: decodedToken['first_name'],
            lastName: decodedToken['last_name'],
            phoneNumber: decodedToken['phone_number'],
            email: decodedToken['email'],
            role: decodedToken['role'],
            latitude: decodedToken['latitude'],
            longitude: decodedToken['longitude'],
            address: decodedToken['address'],
            imageProfile: decodedToken['image_profile']
        }
    }
}