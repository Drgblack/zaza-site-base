export default function SimpleTest() {
  return (
    <div className="p-8">
      <h1>Simple Test Page</h1>
      <p>If you see this, the basic page routing works.</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  );
}