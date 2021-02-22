
export interface IResponseDto {
  message?: string;
  success?: boolean;
  size?: number;
  totalSize?: number;
}

export class ResponseDto implements IResponseDto {
  constructor(
    public message?: string,
    public success?: boolean,
    public size?: number,
    public totalSize?: number
  ) { }
}
