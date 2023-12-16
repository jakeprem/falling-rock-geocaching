export default function ButtonLink(props: {
  href: string;
  target: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={props.href}
      target={props.target}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {props.children}
    </a>
  );
}
