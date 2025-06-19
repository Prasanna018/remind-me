export enum CollectionColor {
    Sunset = "bg-gradient-to-r from-red-500 to-orange-500",
    Poppy = "bg-gradient-to-r from-rose-400 to-red-500",
    Rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
    Snowflake = "bg-gradient-to-r from-indigo-400 to-cyan-400",
    Candy = "bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500",
    FirTree = "bg-gradient-to-r from-emerald-500 to-emerald-900",
    Metal = "bg-gradient-to-r from-slate-500 to-slate-800",
    Powder = "bg-gradient-to-r from-violet-200 to-pink-200",
}

export type CollectionColorType = keyof typeof CollectionColor;
