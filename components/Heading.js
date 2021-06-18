
export default function Heading({size, children}) {
  const fontSize = size == 1 ? 'xl' : size + 'xl';
  return (<h1 className={`font-bold text-${fontSize} py-2`}>
    {children}
  </h1>)
}