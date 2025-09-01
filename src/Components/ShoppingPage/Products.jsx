import {useParams} from 'react-router-dom' 

const Products = () => {
    const params = useParams();
    console.log(params.ProductId);

    const productArr = [
        { 
            productImg: "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw",
            productName: "Mens Casual T-shirt",
        },
        {
            productImg: "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw",
            productName: "Mens Casual T-shirt",
        },
        {
            productImg: "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw",
            productName: "Mens Casual T-shirt",
        },
        {
            productImg: "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw",
            productName: "Mens Casual T-shirt",
        },
        {
            productImg: "https://imgs.search.brave.com/g00tGVFIXqLOfMbjA9DU7QNTnOR3NjHC1oXg6i3y9sU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzMw/LzllL2NjMzA5ZWI1/NjIzNzAwMWFlZDcz/OGI3MDlmNmZhNTI2/LmpwZw",
            productName: "Mens Casual T-shirt",
        },
    ]

    const imageClickHandler = (e) => {
        e.preventDefault();
        window.location.href = '/products-details/1'
    }
  return (
    <div>
    <div className=' grid grid-cols-5 gap-5 m-10'>
        {productArr.map((item, index) => (
            <div className='' key={index}>
            <img onClick={imageClickHandler} className='w-40 ' src={item.productImg} alt="" />
            <h1>{item.productName}</h1>
            <div className=""></div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Products