
export const filterItemsByCategory = ( items, active_category ) => {

        // Si la categoría es 'Show all' que muestre todos los items
    if ( active_category === 'Show all' ) {
        return items;
    }

    return items.filter( item => item.category === active_category );
}
