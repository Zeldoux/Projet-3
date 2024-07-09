/* function to filter works and display the filter  */
export async function filterOnlyObject(works) {
    console.log("Works before filtering:", works);

    /* using filter to only return category.name "Objets" */
    const objectFilter = works.filter(function (works) {
        return works.categoryId === 1;
    });
    console.log("Works after filtering:", objectFilter);
    return objectFilter;
}

/* function to filter works to "Appartements" category "only" */
export async function filterOnlyApart(works) {
    console.log("Works before filtering:", works);

    /* using filter to only return category.name "Appartements" */
    const objectFilter = works.filter(function (works) {
        return works.categoryId === 2;
    });

    console.log("Works after filtering:", objectFilter);
    return objectFilter;
}

/* function to filter works to "Hotel & restaurants" category "only" */
export async function filterOnlyHotel(works) {
    console.log("Works before filtering:", works);

    /* using filter to only return category.name "Hotels & restaurants" */
    const objectFilter = works.filter(function (works) {
        return works.categoryId === 3;
    });
    console.log("Works after filtering:", objectFilter);
    return objectFilter;
}
