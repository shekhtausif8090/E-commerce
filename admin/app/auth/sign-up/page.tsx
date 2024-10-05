"use client";

import { Submit } from "@/lib/action/signup";

import { useRouter } from "next/navigation";
import React from "react";
import { EventType } from "react-hook-form";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    Submit({ email, password, name }).then((data) => {
      console.log(data);
    });
  }
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>Name</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
