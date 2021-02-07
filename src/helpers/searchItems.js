

export const searchItems = ( items, searchValue ) => {
    return items.filter( item => item.name.toLowerCase().includes( searchValue ) );
}