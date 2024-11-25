import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'

export function Home() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	const faqs = [
		{
			question: 'Como posso começar a usar o EasyBilling?',
			answer:
				'Baixe o aplicativo e crie uma conta. A partir daí, você pode conectar suas contas bancárias e começar a acompanhar seus gastos.',
		},
		{
			question: 'O EasyBilling é gratuito?',
			answer:
				'Sim, você pode usar o app gratuitamente com funcionalidades básicas. Oferecemos planos pagos com recursos avançados.',
		},
		{
			question: 'Quais são os métodos de pagamento aceitos?',
			answer:
				'Aceitamos cartões de crédito, débito e outros métodos de pagamento populares para a versão premium do app.',
		},
		{
			question: 'Como posso recuperar minha senha?',
			answer:
				'Basta clicar em "Esqueci minha senha" na tela de login e seguir as instruções para criar uma nova senha.',
		},
	]
	return (
		<div className='font-sans'>
			{/* Header Section */}
			<header className='fixed left-0 right-0 top-0 z-50 bg-[#6D28D9] px-8 py-4 text-white shadow-md'>
				<div className='mx-auto flex max-w-screen-xl items-center justify-between'>
					<h1 className='text-3xl font-semibold'>EasyBilling</h1>
					<nav className='hidden space-x-8 md:flex'>
						<NavLink to='#features' className='text-lg hover:underline'>
							Funcionalidades
						</NavLink>
						<NavLink to='#faq' className='text-lg hover:underline'>
							FAQ
						</NavLink>
						<NavLink to='#cta' className='text-lg hover:underline'>
							Comece Agora
						</NavLink>
						<NavLink to='/auth/signin' className='text-lg hover:underline'>
							Login
						</NavLink>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section className='bg-[#6D28D9] px-4 py-32 text-center text-white md:px-8'>
				<div className='mx-auto max-w-screen-xl'>
					<h2 className='mb-4 text-4xl font-bold'>
						Controle suas finanças de forma simples e eficaz
					</h2>
					<p className='mb-8 text-lg'>
						O EasyBilling ajuda você a organizar suas finanças, acompanhar seus
						gastos e economizar com mais inteligência.
					</p>
					<Button
						className='mb-4 px-8 py-3 text-lg md:mb-0'
						variant='outline'
						onClick={() =>
							toast({
								title: 'Em breve!',
								description: 'Estamos trabalhando no lançamento do app.',
							})
						}
					>
						Baixe o App
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='bg-gray-100 py-20'>
				<div className='mx-auto max-w-screen-xl text-center'>
					<h2 className='mb-12 text-3xl font-bold text-[#6D28D9]'>
						Funcionalidades
					</h2>
					<div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
						<Card>
							<CardHeader>
								<CardTitle className='text-xl'>
									Gerenciamento de Despesas
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Controle seus gastos diários e mantenha seu orçamento
									equilibrado com facilidade.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='text-xl'>
									Relatórios Inteligentes
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Obtenha relatórios detalhados para entender seu padrão de
									consumo.
								</CardDescription>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className='text-xl'>
									Sincronização Bancária
								</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>
									Conecte sua conta bancária e tenha controle total dos seus
									gastos automaticamente.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Testimonial Section */}
			<section className='bg-[#F3E8FF] py-20 text-center'>
				<div className='mx-auto max-w-screen-xl'>
					<h2 className='mb-8 text-3xl font-bold text-[#6D28D9]'>
						O que nossos usuários dizem
					</h2>
					<div className='flex flex-wrap justify-center gap-12'>
						<div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
							<p className='mb-4 text-lg text-black'>
								“O EasyBilling me ajudou a entender onde estou gastando mais e
								me ajudou a economizar.”
							</p>
							<p className='font-semibold'>João da Silva</p>
							<p className='text-sm text-gray-600'>Designer</p>
						</div>
						<div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
							<p className='mb-4 text-lg text-black'>
								“Agora consigo planejar melhor meus gastos e nunca mais fico sem
								saber para onde foi meu dinheiro.”
							</p>
							<p className='font-semibold'>Ana Costa</p>
							<p className='text-sm text-gray-600'>Empresária</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id='faq' className='bg-[#6D28D9] py-20 text-white'>
				<div className='mx-auto max-w-screen-xl text-center'>
					<h2 className='mb-8 text-3xl font-bold'>
						Encontre respostas para suas perguntas
					</h2>

					<div className='space-y-4'>
						{faqs.map((faq, index) => (
							<div
								key={index}
								className='overflow-hidden rounded-lg bg-white shadow-md'
							>
								<div
									className='flex cursor-pointer items-center justify-between p-4 transition hover:bg-purple-100'
									onClick={() => toggleAccordion(index)}
								>
									<h3 className='text-xl font-semibold text-[#6D28D9]'>
										{faq.question}
									</h3>
									<span
										className={`transform transition-all duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											className='h-5 w-5 text-[#6D28D9]'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M19 9l-7 7-7-7'
											/>
										</svg>
									</span>
								</div>

								{activeIndex === index && (
									<div className='bg-gray-50 p-4 text-left text-gray-700'>
										<p>{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section id='cta' className='bg-white py-20 text-[#6D28D9]'>
				<div className='mx-auto max-w-screen-xl text-center'>
					<h2 className='mb-4 text-3xl font-bold'>
						Comece a controlar suas finanças agora!
					</h2>
					<p className='mb-8 text-lg'>
						Baixe o EasyBilling hoje e comece a planejar seu futuro financeiro
						com facilidade e segurança.
					</p>
					<Button
						className='px-8 py-3 text-lg text-white'
						variant='outline'
						onClick={() =>
							toast({
								title: 'Em breve!',
								description: 'Estamos trabalhando para lançar o app.',
							})
						}
					>
						Baixar o App
					</Button>
				</div>
			</section>

			{/* Footer Section */}
			<footer className='bg-gray-900 py-6 text-white'>
				<div className='mx-auto flex max-w-screen-xl items-center justify-between'>
					<div className='space-x-4'>
						<NavLink to='/privacy-policy' className='text-sm hover:underline'>
							Política de Privacidade
						</NavLink>
						<NavLink to='/terms' className='text-sm hover:underline'>
							Termos de Serviço
						</NavLink>
					</div>
					<p className='text-sm'>
						© 2024 EasyBilling. Todos os direitos reservados.
					</p>
				</div>
			</footer>
		</div>
	)
}
