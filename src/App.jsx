import Button from "./components/ui/Button";

export default function App() {
  return (<>
    <div className="flex flex-col gap-5">
      <Button size="sm" variant="common">common-m</Button>

      <Button size="md" variant="common">common-m</Button>

      <Button size="lg" variant="common">common-m</Button>
    </div>


  </>  
  );
}