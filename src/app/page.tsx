

export default function Home() {
  return (
    <div>
      <form action="/api/checkout" method="post" encType="application/x-www-form-urlencoded">
        <input name="count" value="123" type="text" />
        <input name="count2" value="123" type="text" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
