
export interface FlyRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    headers?: any;
    body?: any;
    timeout?: number;
    withCredentials?: boolean;
    responseType?: string;
}

export interface FlyResponse<T = any>  {
    data: T;
    request: FlyRequestConfig;
    engine: XMLHttpRequest;
}

export interface FlyPromise<T = any> extends Promise<FlyResponse<T>> {
}

export interface FlyInterceptorPreHandler{
   resolve(data?:any):void;
   reject(data?:any):void;
}

export interface FlyRequestInterceptor<V> {
    use(onSend?: (config: V,preHandler?:FlyInterceptorPreHandler) => any):void;
}
export interface FlyResponseInterceptor<V> {
    use(onSucceed?: (response: V,preHandler?:FlyInterceptorPreHandler) => any,onError?: (err: Error,preHandler?:FlyInterceptorPreHandler) => any):void;
}

interface Fly {
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
}
declare const fly:Fly;
export default fly;

