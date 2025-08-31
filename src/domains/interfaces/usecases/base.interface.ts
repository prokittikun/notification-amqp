export interface IBaseUseCase<TParams, TResponse> {
    execute(params: TParams): Promise<TResponse>;
}