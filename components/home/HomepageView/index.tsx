import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function HomepageView() {
  return (
    <main className="h-screen bg-yellow-100">
      <header className="bg-white py-4">
        <nav className="container mx-auto flex justify-between">
          <div className="text-lg font-bold">Family app</div>
          <div className="flex gap-4">
            <LoginLink>Entrar</LoginLink>
            <RegisterLink>Registrar</RegisterLink>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 mt-4">
        <section className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Aplicativo Familiar</h1>
          <p className="text-lg mb-8">Família não é apenas uma coisa importante. É tudo. Aqui, nosso objetivo é aproximar as famílias, proporcionando uma plataforma para compartilhar, cuidar e amar.</p>
          <RegisterLink className="bg-primary text-primary-foreground p-2 rounded">Começar</RegisterLink>
        </section>
      </main>
    </main>
  )
}
