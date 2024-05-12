import axios from 'axios'
import { useEffect, useState } from 'react'
import { IFace } from './types/types'
  import { ToastContainer, toast } from 'react-toastify'
	import 'react-toastify/dist/ReactToastify.css'

const App = () => {
	const [value, setValue] = useState('')
	const [productImg, setProductImg] = useState('')
	const [product, setProduct] = useState<IFace[]>([])
	const [loading, setLoading] = useState<boolean>(true)

  const error = () => {
			toast.error('🦄 Wow so easy!', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light'
			})
	}
	const getData = async () => {
		try {
			const { data } = await axios.get<IFace[]>(
				'https://api-v2.elchocrud.pro/api/v1/475239e1543255713b606d2e0821b05c/product19'
			)
			console.log(data)
		} catch (e) {
			console.error(e)
		}
	}
	const postData = async () => {
		try {
			if(value.trim() === "" || productImg.trim() === ""){
				error()
			}
			const { data } = await axios.post(
				'https://api-v2.elchocrud.pro/api/v1/475239e1543255713b606d2e0821b05c/product19	',
				{
					id: 1,
					name: value,
					url: productImg
				}
			)
			setProduct(data)
		} catch (e) {
			console.error(e)
		} finally {
			setLoading(false)
		}
	}
	console.log("hellow world" ,"awefawefawef");
	
	return (
		<div>
			<div className='container'>
				<div className='home'>
					<input
						type='text'
						value={value}
						onChange={e => setValue(e.target.value)}
					/>
					<input
						type='text'
						value={productImg}
						onChange={e => setProductImg(e.target.value)}
					/>
					<button onClick={() => postData()}>create</button>
				</div>
				<div className='block'>
					{product.map(el => (
						<div className='block-text'>
							<img src={el.url} alt='img' />
							<h1 className='h1'>{el.name}</h1>
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default App
