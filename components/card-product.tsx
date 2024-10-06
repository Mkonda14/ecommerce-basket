"use client"

interface CardProductProps{
    marque: string;
    model: string;
    description: string;
    price: string;
    imgUrl: string;
}

export const CardProduct = ({marque, model, description, prince, imgUrl}: CardProductProps) => {


    return (
        <article>
            <header>

            </header>
            <figure>

            </figure>
            <caption>
                <h2>{marque}</h2>
            </caption>
        </article>
    )
}
