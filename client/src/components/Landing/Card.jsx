

export default function Card({ title, description, imageSrc = ""}) {
  return (
    <div className="card w-75 overflow-hidden">
        <div className="banner h-50 bg-accent-gradient rounded-2xl">
            {!!imageSrc && <img src={imageSrc}/>}
        </div>
        <div className="details text-center">
            <h5 className="text-xl font-bold pt-4 pb-2">{title}</h5>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
  )
}
