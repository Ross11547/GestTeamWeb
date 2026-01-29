import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Heart, MapPin, Phone, Mail, Globe, ChevronRight, HelpCircle,
  Wrench, Lightbulb, User, FileText, MessageSquare, Send,
  Clock, GraduationCap, Building2, Users, CheckCircle, Star
} from 'lucide-react';
import { Colors, ColorsLogin } from '../../style/colors';

const Container = styled.div`
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: -0.5px;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${Colors.greyLight};
  text-align: center;
  line-height: 1.6;
  margin: 0 0 40px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 20px;
`;

const ContactInfoSection = styled.div``;

const InfoGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const InfoCard = styled.div`
  height: 178px;
  background: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${ColorsLogin.secondary100};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const InfoIconContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${ColorsLogin.secondary100}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0 0 6px 0;
`;

const InfoValue = styled.p`
  font-size: 0.95rem;
  color: ${Colors.greyLight};
  line-height: 1.4;
  margin: 0;
  white-space: pre-line;
`;

const MapSection = styled.div`
  margin-bottom: 40px;
`;

const MapContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  height: 300px;
  border: 4px solid ${Colors.white};
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const FormSection = styled.div``;

const FormContainer = styled.div`
  height: 830px;
  background: ${Colors.white};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  text-align: center;
  margin: 0 0 12px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Required = styled.span`
  color: #dc2626;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: ${props => props.isTextArea ? 'flex-start' : 'center'};
  background: #f8f9fa;
  border-radius: 12px;
  padding: ${props => props.isTextArea ? '16px 14px' : '12px 14px'};
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: ${ColorsLogin.secondary100};
    background: ${Colors.white};
    box-shadow: 0 0 0 3px ${ColorsLogin.secondary100}15;
  }
`;

const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  color: ${Colors.greyDark};
  margin-left: 12px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;

  &::placeholder {
    color: ${Colors.greyLight};
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  font-size: 1rem;
  color: ${Colors.greyDark};
  margin-left: 12px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  resize: none;
  height: 120px;
  font-family: inherit;
  line-height: 1.5;

  &::placeholder {
    color: ${Colors.greyLight};
  }
`;

const TypeContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const TypeButton = styled.button`
  display: flex;
  align-items: center;
  background: ${props => props.active ? ColorsLogin.secondary100 : Colors.white};
  border: 2px solid ${props => props.active ? ColorsLogin.secondary100 : '#e9ecef'};
  padding: 12px 20px;
  border-radius: 12px;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: ${props => props.active ? ColorsLogin.secondary100 : '#f8f9fa'};
    border-color: ${ColorsLogin.secondary100};
    transform: translateY(-2px);
  }
`;

const TypeText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.active ? Colors.white : Colors.greyDark};
`;

const SubmitButton = styled.button`
  margin-top: 32px;
  border-radius: 12px;
  border: none;
  width: 100%;
  cursor: pointer;
  background: linear-gradient(135deg, ${ColorsLogin.secondary100}, ${ColorsLogin.secondary200});
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px ${ColorsLogin.secondary100}40;
  font-family: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${ColorsLogin.secondary100}50;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubmitButtonText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${Colors.white};
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 2px solid #16a34a;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #15803d;
`;

const TextAreaIcon = styled.div`
  margin-top: 4px;
`;

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [selectedType, setSelectedType] = useState('consulta');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      alert('Complete todos los campos obligatorios para enviar su consulta');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ingrese un correo electrónico válido');
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setShowSuccess(true);
    limpiarFormulario();
    setIsSubmitting(false);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setAsunto('');
    setMensaje('');
    setSelectedType('consulta');
  };


  const tiposConsulta = [
    { id: 'consulta', label: 'Consulta General', icon: HelpCircle },
    { id: 'soporte', label: 'Soporte Técnico', icon: Wrench },
    { id: 'sugerencia', label: 'Sugerencia', icon: Lightbulb },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Campus Central Cochabamba',
      value: 'Av. Villarroel, esq N° 359\nZona Central, Cochabamba\nBolivia',
      action: () => window.open('https://maps.app.goo.gl/2YfiTN4kpWkdMQiZ6', '_blank'),
    },
    {
      icon: Phone,
      title: 'Centro de Atención',
      value: '+591 63986377\nLínea gratuita: 4593927',
      action: () => window.open('tel:+59163986377'),
    },
    {
      icon: Mail,
      title: 'Correo Institucional',
      value: 'info@unifranz.edu.bo\ngestteam@unifranz.edu.bo',
      action: () => window.open('mailto:info@unifranz.edu.bo'),
    },
    {
      icon: Globe,
      title: 'Sitio Web Oficial',
      value: 'www.unifranz.edu.bo\nPlataforma GestTeam',
      action: () => window.open('https://unifranz.edu.bo/', '_blank'),
    },
  ];

  return (
    <Container>
      <Content>
        <MainLayout>
          {/* Información de contacto y mapa */}
          <ContactInfoSection>
            <SectionTitle>Información de Contacto</SectionTitle>

            <InfoGrid>
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <InfoCard key={index} onClick={info.action}>
                    <InfoIconContainer>
                      <IconComponent size={28} color={ColorsLogin.secondary100} strokeWidth={2} />
                    </InfoIconContainer>
                    <InfoContent>
                      <InfoTitle>{info.title}</InfoTitle>
                      <InfoValue>{info.value}</InfoValue>
                    </InfoContent>
                    <ChevronRight size={20} color={Colors.greyLight} />
                  </InfoCard>
                );
              })}
            </InfoGrid>
          </ContactInfoSection>

          {/* Formulario de contacto */}
          <FormSection>
            <FormContainer>
              <FormTitle>Envíanos tu Consulta</FormTitle>

              {showSuccess && (
                <SuccessMessage>
                  <CheckCircle size={20} />
                  <span>¡Consulta enviada exitosamente! Te responderemos pronto.</span>
                </SuccessMessage>
              )}

              <form onSubmit={handleSubmit}>
                <Label>Tipo de Consulta <Required>*</Required></Label>
                <TypeContainer>
                  {tiposConsulta.map((tipo) => {
                    const IconComponent = tipo.icon;
                    return (
                      <TypeButton
                        key={tipo.id}
                        type="button"
                        active={selectedType === tipo.id}
                        onClick={() => setSelectedType(tipo.id)}
                      >
                        <IconComponent
                          size={18}
                          color={selectedType === tipo.id ? Colors.white : Colors.greyDark}
                          strokeWidth={2}
                        />
                        <TypeText active={selectedType === tipo.id}>
                          {tipo.label}
                        </TypeText>
                      </TypeButton>
                    );
                  })}
                </TypeContainer>

                <FormGrid>
                  <FormGroup>
                    <Label>Nombre Completo <Required>*</Required></Label>
                    <InputContainer>
                      <User size={20} color={Colors.greyLight} strokeWidth={2} />
                      <Input
                        type="text"
                        placeholder="Ingrese su nombre completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                      />
                    </InputContainer>
                  </FormGroup>

                  <FormGroup>
                    <Label>Correo Electrónico <Required>*</Required></Label>
                    <InputContainer>
                      <Mail size={20} color={Colors.greyLight} strokeWidth={2} />
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputContainer>
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Asunto</Label>
                  <InputContainer>
                    <FileText size={20} color={Colors.greyLight} strokeWidth={2} />
                    <Input
                      type="text"
                      placeholder="Asunto de su consulta"
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                    />
                  </InputContainer>
                </FormGroup>

                <FormGroup style={{ marginTop: '24px' }}>
                  <Label>Mensaje <Required>*</Required></Label>
                  <InputContainer isTextArea>
                    <TextAreaIcon>
                      <MessageSquare size={20} color={Colors.greyLight} strokeWidth={2} />
                    </TextAreaIcon>
                    <TextArea
                      placeholder="Escriba detalladamente su consulta, solicitud o sugerencia..."
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      required
                    />
                  </InputContainer>
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      <SubmitButtonText>Enviando...</SubmitButtonText>
                    </>
                  ) : (
                    <>
                      <Send size={20} color={Colors.white} strokeWidth={2} />
                      <SubmitButtonText>Enviar Consulta</SubmitButtonText>
                    </>
                  )}
                </SubmitButton>
              </form>
            </FormContainer>
          </FormSection>
        </MainLayout>
        <MapSection>
          <SectionTitle>Nuestra Ubicación</SectionTitle>
          <MapContainer>
            <MapFrame
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2847589394756!2d-66.15931492496933!3d-17.39326708348641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373d0a3f35f8b%3A0x7f7e4b3e7a8c5f8d!2sUnifranz%20Cochabamba!5e0!3m2!1ses!2sbo!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
        </MapSection>
      </Content>
    </Container>
  );
};

export default Contacto;