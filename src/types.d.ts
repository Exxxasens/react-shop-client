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
}

export {};
