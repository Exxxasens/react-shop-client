declare module '*.png';
declare module '*.svg' {
    const content: string;
    export default content;
}

declare global {
    interface LoginSchema {
        email: string;
        password: string;
    }
    interface RegisterSchema {
        email: string;
        name: string;
        lastname: string;
        password: string;
    }
    interface UpdatePasswordSchema {
        password: string;
        newPassword: string;
        repeatPassword: string;
    }
    interface IUser {
        _id: string;
        email: string;
        name: string;
        lastname: string;
    }
    interface IAddress {
        _id: string;
        region: string;
        city: string;
        street: string;
        building: string;
        postCode: string;
    }
    interface IMessage {
        type: 'error' | 'info' | 'success';
        text: string;
    }
    interface ErrorResponse {
        status: number;
        message: string;
    }
}

export {};
