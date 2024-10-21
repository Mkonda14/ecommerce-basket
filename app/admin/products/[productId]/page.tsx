
interface ProductProps{
    params: {
        productId: string
    }
}

export default function Product({ params }: ProductProps) {
  return (
    <div>Product id: {params.productId}</div>
  )
}
