'use client';

import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    tipo_projeto: '',
    mensagem: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.nome.trim()) { setFormError('Por favor, informe seu nome.'); return false; }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Por favor, informe um e-mail válido.'); return false;
    }
    if (!formData.mensagem.trim()) { setFormError('Por favor, descreva seu projeto.'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Try SDCMS lead capture first
      const cmsBaseUrl = process.env.NEXT_PUBLIC_CMS_BASE_URL || 'https://sdcms-web.vercel.app';
      const publicId = process.env.NEXT_PUBLIC_LEAD_FORM_ID;

      if (publicId) {
        const response = await fetch(`${cmsBaseUrl}/api/lead-magnets/${publicId}/capture`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: formData, hp: '' }),
        });

        const data = await response.json();
        if (response.ok && data.ok) {
          setFormSubmitted(true);
          setFormData({ nome: '', email: '', telefone: '', empresa: '', tipo_projeto: '', mensagem: '' });
          setTimeout(() => setFormSubmitted(false), 6000);
          return;
        }
      }

      // Fallback: Formspree
      const formspreeData = new FormData();
      Object.entries(formData).forEach(([key, value]) => formspreeData.append(key, value));

      const res = await fetch('https://formspree.io/f/xpwzqjnb', {
        method: 'POST',
        body: formspreeData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormSubmitted(true);
        setFormData({ nome: '', email: '', telefone: '', empresa: '', tipo_projeto: '', mensagem: '' });
        setTimeout(() => setFormSubmitted(false), 6000);
      } else {
        throw new Error('Erro ao enviar');
      }
    } catch {
      setFormError('Erro ao enviar. Tente novamente ou nos contate por e-mail.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ========== HERO SUB ========== */}
      <section className="hero-sub">
        <div className="hero-texture" style={{ backgroundImage: "url('/assets/texture-sondagem-profile.svg')" }} aria-hidden="true" />
        <div className="container">
          <span className="badge">Diagnóstico de base</span>
          <h1>Seu projeto merece<br />critério técnico.</h1>
          <p>
            Decisões fundamentadas exigem investigação criteriosa.
            Entre em contato para um diagnóstico geotécnico com responsabilidade.
          </p>
        </div>
      </section>

      {/* ========== CONTACT FORM ========== */}
      <section className="section">
        <div className="container">
          <div className="contact-split">
            {/* Left — info */}
            <ScrollReveal>
              <div>
                <h2>Entre em contato</h2>
                <p className="lead">
                  Compartilhe informações sobre seu projeto.
                  Nossa equipe retornará em até 24 horas.
                </p>

                <div className="spacer-md"></div>

                <div className="contact-info">
                  <h3>E-mail</h3>
                  <p>contato@serradomar.com.br</p>
                </div>

                <div className="spacer-sm"></div>

                <div className="contact-info">
                  <h3>WhatsApp</h3>
                  <p>+55 (00) 00000-0000</p>
                </div>

                <div className="spacer-sm"></div>

                <div className="contact-info">
                  <h3>Horário</h3>
                  <p>Segunda a sexta, 08h–18h</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal>
              {formSubmitted ? (
                <div className="cta-card" style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#6FCF97' }}>✓ Mensagem enviada com sucesso!</h3>
                  <p>Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form" noValidate>
                  <div className="form-row">
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Nome completo *"
                      required
                      autoComplete="name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="E-mail *"
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="form-row">
                    <input
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="Telefone / WhatsApp"
                      autoComplete="tel"
                    />
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      placeholder="Empresa"
                      autoComplete="organization"
                    />
                  </div>

                  <select
                    name="tipo_projeto"
                    value={formData.tipo_projeto}
                    onChange={handleChange}
                    aria-label="Tipo de projeto"
                  >
                    <option value="" disabled>Tipo de projeto…</option>
                    <option value="Geotecnia / Fundações">Geotecnia / Fundações</option>
                    <option value="Infraestrutura para Loteamento">Infraestrutura para Loteamento</option>
                    <option value="Expansão Industrial">Expansão Industrial</option>
                    <option value="Laudo / Parecer Técnico">Laudo / Parecer Técnico</option>
                    <option value="Consultoria Estratégica">Consultoria Estratégica</option>
                    <option value="Monitoramento de Risco">Monitoramento de Risco</option>
                    <option value="Outro">Outro</option>
                  </select>

                  <textarea
                    name="mensagem"
                    rows={5}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Descreva seu projeto e as principais necessidades *"
                    required
                  />

                  {/* Honeypot anti-spam */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                  {formError && (
                    <div className="form-message error">{formError}</div>
                  )}

                  <button
                    className="btn primary"
                    type="submit"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando…' : 'Solicitar diagnóstico técnico'}
                  </button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
