import { useState } from "react"

function Subscribe() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function subscribe() {
    if (email.trim() === "") {
      setMessage("Please enter your email")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const result = await response.text()

      if (response.ok) {
        setMessage(result)
        setEmail("")
      } else {
        setMessage(result)
      }
    } catch {
      setMessage("Unable to connect to the backend. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="subscribe"
      className="section"
      style={{ textAlign: "center", padding: "20px" }}
    >
      <h2 className="text-2xl text-center font-bold">
        Subscribe
      </h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={subscribe} disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
      </button>

      <p>{message}</p>
    </section>
  )
}

export default Subscribe