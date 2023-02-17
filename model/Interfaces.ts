export interface IFileList {
    id: number;
    file_fid: string;
    file_parent: string;
    file_name: string;
    file_type: string;
    file_size: number;
    file_downloadUrl?: string;
    childCount?: number;
    lastModifiedDateTime: string;
    file_up_time: string;
}

// 声明 ICallback(err, result) 函数类型
export type ICallback = (err: any, result: any) => void;

export interface ILink {
    id: number;
    short_link: string
    long_link: string
    click_cot: number
}