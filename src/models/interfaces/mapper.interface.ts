export interface IMapper<T, U> {
    map(input: T): U;
    reverseMap(output: U): T;
}