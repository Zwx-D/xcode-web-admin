export interface CreatePortfolioItemDTO {
    name: string;
    desc: string;
    sortOrder: number;
    isShow: boolean;
    imageUuid: string;
    portfolioUuid: string;
}