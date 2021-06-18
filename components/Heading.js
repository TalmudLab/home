
export default function Heading({size=1, children, centered=false}) {
  const fontSize = size == 1 ? 'xl' : size + 'xl';
  let className =`font-bold text-${fontSize} py-2 `;
  if (centered) {
    className += "text-center"
  }
  return (<h1 className={className}>
    {children}
  </h1>)
}