export type Comic = {
    id:                 number;
    digitalId:          number;
    title:              string;
    issueNumber:        number;
    variantDescription: string;
    description:        null | string;
    modified:           string;
    isbn:               Isbn;
    upc:                string;
    diamondCode:        string;
    ean:                string;
    issn:               string;
    format:             Format;
    pageCount:          number;
    textObjects:        TextObject[];
    resourceURI:        string;
    urls:               URL[];
    series:             Series;
    variants:           any[];
    collections:        Series[];
    collectedIssues:    Series[];
    dates:              DateElement[];
    prices:             Price[];
    thumbnail:          Thumbnail;
    images:             Thumbnail[];
    creators:           Creators;
    characters:         Characters;
    stories:            Stories;
    events:             Characters;
}

export type Characters = {
    available:     number;
    collectionURI: string;
    items:         Series[];
    returned:      number;
}

export type Series = {
    resourceURI: string;
    name:        string;
}

export type Creators = {
    available:     number;
    collectionURI: string;
    items:         CreatorsItem[];
    returned:      number;
}

export type CreatorsItem = {
    resourceURI: string;
    name:        string;
    role:        Role;
}

export enum Role {
    Colorist = "colorist",
    Editor = "editor",
    Inker = "inker",
    Letterer = "letterer",
    Penciler = "penciler",
    Penciller = "penciller",
    PencillerCover = "penciller (cover)",
    Writer = "writer",
}

export type DateElement = {
    type: DateType;
    date: string;
}

export enum DateType {
    DigitalPurchaseDate = "digitalPurchaseDate",
    FocDate = "focDate",
    OnsaleDate = "onsaleDate",
    UnlimitedDate = "unlimitedDate",
}

export enum Format {
    Comic = "Comic",
    Hardcover = "Hardcover",
}

export type Thumbnail = {
    path:      string;
    extension: Extension;
}

export enum Extension {
    Jpg = "jpg",
}

export enum Isbn {
    Empty = "",
    The0785111867 = "0-7851-1186-7",
    The0785117857 = "0-7851-1785-7",
    The0785128263 = "0-7851-2826-3",
}

export type Price = {
    type:  PriceType;
    price: number;
}

export enum PriceType {
    DigitalPurchasePrice = "digitalPurchasePrice",
    PrintPrice = "printPrice",
}

export type Stories = {
    available:     number;
    collectionURI: string;
    items:         StoriesItem[];
    returned:      number;
}

export type StoriesItem = {
    resourceURI: string;
    name:        string;
    type:        ItemType;
}

export enum ItemType {
    Cover = "cover",
    Empty = "",
    InteriorStory = "interiorStory",
    TextStory = "text story",
}

export type TextObject = {
    type:     TextObjectType;
    language: Language;
    text:     string;
}

export enum Language {
    EnUs = "en-us",
}

export enum TextObjectType {
    IssuePreviewText = "issue_preview_text",
    IssueSolicitText = "issue_solicit_text",
    The70ThWinnerDesc = "70th_winner_desc",
}

export type URL = {
    type: URLType;
    url:  string;
}

export enum URLType {
    Detail = "detail",
    InAppLink = "inAppLink",
    Purchase = "purchase",
    Reader = "reader",
}