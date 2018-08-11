export interface FlyRequestConfig extends Object {
    url?: string;
    method?: string;
    baseURL?: string;
    headers?: any;
    body?: any;
    timeout?: number;
    withCredentials?: boolean;
    parseJson?: boolean;
    responseType?: string;
}

export interface FlyError {
    status: number;
    message: string;
    engine: XMLHttpRequest;
    request?: FlyRequestConfig;
    response?: FlyErrResponse;
}

export interface FlyResponse<T = any> {
    data: T;
    request: FlyRequestConfig;
    engine: XMLHttpRequest;
    headers: Object;
}

export interface FlyErrResponse {
    data: any;
    headers: Object;
    status: number;
    statusText: string;
}

export interface FlyPromise<T = any> extends Promise<FlyResponse<T>> {
}

export interface FlyRequestInterceptor<V> {
    use(onSend?: (request: V) => any): void;
    lock(): void;
    unlock(): void;

    clear(): void;
}
export interface FlyResponseInterceptor<V> {
    use(onSucceed?: (response: V) => any, onError?: (err: Error) => any): void;
    lock(): void;
    unlock(): void;

    clear(): void;
}

export interface Fly {
    config: FlyRequestConfig;
    interceptors: {
        request: FlyRequestInterceptor<FlyRequestConfig>;
        response:FlyResponseInterceptor<FlyResponse>;
    };
    engine:any;
    request<T = any>(url: string, data?: any, config?: FlyRequestConfig): FlyPromise<T>;
    get<T = any>(url: string, data?:any, config?: FlyRequestConfig): FlyPromise<T>;
    delete(url: string, data?:any, config?: FlyRequestConfig): FlyPromise;
    head(url: string,data?:any, config?: FlyRequestConfig): FlyPromise;
    post<T = any>(url: string, data?: any, config?: FlyRequestConfig): FlyPromise<T>;
    put<T = any>(url: string, data?: any, config?: FlyRequestConfig): FlyPromise<T>;
    patch<T = any>(url: string, data?: any, config?: FlyRequestConfig): FlyPromise<T>;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;

    lock(): void;
    unlock(): void;

    clear(): void;
}
declare const fly:Fly;
export default fly;

