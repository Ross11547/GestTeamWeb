import React from 'react';
import styled from 'styled-components';
import { 
  Monitor, Globe, Smartphone, CheckCircle, RefreshCw, Shield,
  Cloud, Laptop, Download, Star, Zap, Users, Lock,
  Wifi, HardDrive, Award, Clock
} from 'lucide-react';
import { ColorsLogin, Colors } from '../../style/colors';

const Container = styled.div`
  background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${ColorsLogin.secondary100} 0%, ${ColorsLogin.secondary200} 100%);
  color: ${Colors.white};
  padding: 80px 24px 60px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m0 40l40-40h-40v40z'/%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.1;
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const HeaderBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: ${Colors.white};
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  display: inline-block;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${Colors.white};
  margin: 0 0 16px 0;
  letter-spacing: -1px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
  margin-top: 20px;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
`;

const StatCard = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  background: ${props => props.color}15;
  color: ${props => props.color};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${Colors.greyDark};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${Colors.greyLight};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
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
  margin: 0 0 50px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const PlatformsGrid = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 80px;
`;

const PlatformCard = styled.div`
  background: ${Colors.white};
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.accentColor};
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const PlatformHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 24px;
`;

const PlatformIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: ${props => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${PlatformCard}:hover & {
    transform: scale(1.1) rotate(-3deg);
  }
`;

const PlatformTitleContainer = styled.div`
  flex: 1;
`;

const PlatformTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #16a34a15, #16a34a10);
  color: #16a34a;
  padding: 6px 14px;
  border-radius: 20px;
  gap: 6px;
  border: 2px solid #16a34a20;
  font-size: 13px;
  font-weight: 600;
`;

const DownloadButton = styled.button`
  background: ${props => props.color}15;
  color: ${props => props.color};
  border: 2px solid ${props => props.color}30;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;

  &:hover {
    background: ${props => props.color}25;
    transform: translateY(-2px);
  }
`;

const PlatformDescription = styled.p`
  font-size: 1rem;
  color: ${Colors.greyLight};
  line-height: 1.6;
  margin: 0 0 32px 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.accentColor}10;
    transform: translateX(4px);
  }
`;

const FeatureText = styled.span`
  font-size: 0.95rem;
  color: ${Colors.greyDark};
  font-weight: 500;
  line-height: 1.4;
`;

const BenefitsSection = styled.div``;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
`;

const BenefitCard = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${props => props.color}15;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  margin: 0 0 8px 0;
`;

const BenefitDescription = styled.p`
  font-size: 0.95rem;
  color: ${Colors.greyLight};
  line-height: 1.5;
  margin: 0;
`;

const CompatibilitySection = styled.div`
  background: ${Colors.white};
  border-radius: 20px;
  padding: 40px;
  margin-top: 60px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
`;

const CompatibilityTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${Colors.greyDark};
  text-align: center;
  margin: 0 0 32px 0;
`;

const CompatibilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const CompatibilityItem = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &:hover {
    background: ${ColorsLogin.secondary100}10;
    transform: translateY(-2px);
  }
`;

const CompatibilityIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const CompatibilityLabel = styled.div`
  font-weight: 600;
  color: ${Colors.greyDark};
  margin-bottom: 4px;
`;

const CompatibilityVersion = styled.div`
  font-size: 0.85rem;
  color: ${Colors.greyLight};
`;

const Plataformas = () => {
  const stats = [
    {
      number: '100%',
      label: 'Sincronización',
      icon: RefreshCw,
      color: ColorsLogin.secondary100
    },
    {
      number: '3',
      label: 'Plataformas',
      icon: Monitor,
      color: '#16a34a'
    },
    {
      number: '99.9%',
      label: 'Tiempo actividad',
      icon: Award,
      color: '#7c3aed'
    },
    {
      number: '24/7',
      label: 'Disponibilidad',
      icon: Clock,
      color: '#dc2626'
    }
  ];

  const platforms = [
    {
      id: 1,
      title: 'Plataforma Web',
      description: 'Acceso completo desde cualquier navegador moderno. Interfaz optimizada para gestión académica profesional con todas las herramientas de GestTeam.',
      icon: Globe,
      color: ColorsLogin.secondary100,
      features: [
        'Dashboard interactivo completo',
        'Editor colaborativo en tiempo real',
        'Gestión avanzada de proyectos',
        'Reportes académicos detallados',
        'Sistema de notificaciones',
        'Integración con calendario'
      ]
    },
    {
      id: 2,
      title: 'Aplicación Móvil',
      description: 'Apps nativas para iOS y Android con sincronización automática. Diseñadas específicamente para productividad académica en movimiento.',
      icon: Smartphone,
      color: '#16a34a',
      features: [
        'Acceso offline completo',
        'Notificaciones push inteligentes',
        'Carga de archivos multimedia',
        'Sincronización en tiempo real',
        'Interfaz táctil optimizada',
        'Modo oscuro disponible'
      ]
    },
    {
      id: 3,
      title: 'Aplicación de Escritorio',
      description: 'Software nativo para Windows, macOS y Linux. Rendimiento superior con integración profunda del sistema operativo.',
      icon: Laptop,
      color: '#7c3aed',
      features: [
        'Rendimiento nativo optimizado',
        'Integración con archivos locales',
        'Herramientas avanzadas de edición',
        'Respaldo automático local',
        'Atajos de teclado personalizables',
        'Modo concentración sin distracciones'
      ]
    }
  ];

  const benefits = [
    {
      icon: RefreshCw,
      title: 'Sincronización Universal',
      description: 'Todos tus proyectos, notas y archivos sincronizados automáticamente entre todos los dispositivos en tiempo real.',
      color: ColorsLogin.secondary100
    },
    {
      icon: Shield,
      title: 'Seguridad de Nivel Empresarial',
      description: 'Cifrado de extremo a extremo, autenticación de dos factores y respaldos seguros para proteger tu trabajo académico.',
      color: '#16a34a'
    },
    {
      icon: Cloud,
      title: 'Almacenamiento Inteligente',
      description: 'Acceso desde cualquier lugar con almacenamiento en la nube optimizado y gestión automática de versiones.',
      color: '#7c3aed'
    },
    {
      icon: Zap,
      title: 'Rendimiento Optimizado',
      description: 'Interfaz fluida y responsive diseñada para maximizar la productividad académica en cualquier dispositivo.',
      color: '#ea580c'
    },
    {
      icon: Users,
      title: 'Colaboración Seamless',
      description: 'Trabajo en equipo sin fricciones con herramientas de colaboración en tiempo real y gestión de permisos.',
      color: '#0891b2'
    },
    {
      icon: Wifi,
      title: 'Trabajo Offline',
      description: 'Continúa trabajando sin conexión. Los cambios se sincronizan automáticamente cuando recuperes internet.',
      color: '#dc2626'
    }
  ];

  const compatibility = [
    { icon: '🌐', label: 'Navegadores Web', version: 'Chrome 90+, Firefox 88+, Safari 14+' },
    { icon: '📱', label: 'iOS', version: 'iOS 13.0 o superior' },
    { icon: '🤖', label: 'Android', version: 'Android 8.0 (API 26)+' },
    { icon: '🖥️', label: 'Windows', version: 'Windows 10/11 (64-bit)' },
    { icon: '🍎', label: 'macOS', version: 'macOS 10.15 Catalina+' },
    { icon: '🐧', label: 'Linux', version: 'Ubuntu 20.04, Fedora 34+' }
  ];

  return (
    <Container>
      <ContentContainer>
        {/* Plataformas */}
        <SectionTitle>Plataformas Disponibles</SectionTitle>
        <SectionSubtitle>
          GestTeam está optimizado para cada plataforma, brindando la mejor experiencia 
          en tu dispositivo preferido
        </SectionSubtitle>

        <PlatformsGrid>
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <PlatformCard key={platform.id} accentColor={platform.color}>
                <PlatformHeader>
                  <PlatformIcon bgColor={`${platform.color}15`}>
                    <IconComponent size={36} color={platform.color} strokeWidth={2} />
                  </PlatformIcon>
                  <PlatformTitleContainer>
                    <PlatformTitle>{platform.title}</PlatformTitle>
                    <StatusBadge>
                      <CheckCircle size={16} strokeWidth={2} />
                      Disponible
                    </StatusBadge>
                    <DownloadButton color={platform.color}>
                      <Download size={16} />
                      Acceder ahora
                    </DownloadButton>
                  </PlatformTitleContainer>
                </PlatformHeader>

                <PlatformDescription>{platform.description}</PlatformDescription>

                <FeaturesGrid>
                  {platform.features.map((feature, index) => (
                    <FeatureItem key={index} accentColor={platform.color}>
                      <CheckCircle 
                        size={18} 
                        color={platform.color} 
                        strokeWidth={2} 
                      />
                      <FeatureText>{feature}</FeatureText>
                    </FeatureItem>
                  ))}
                </FeaturesGrid>
              </PlatformCard>
            );
          })}
        </PlatformsGrid>

        {/* Beneficios */}
        <SectionTitle>Beneficios de la Multiplataforma</SectionTitle>
        <SectionSubtitle>
          Diseñado para estudiantes y docentes modernos que necesitan flexibilidad 
          y productividad sin límites
        </SectionSubtitle>

        <BenefitsGrid>
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <BenefitCard key={index}>
                <BenefitIcon color={benefit.color}>
                  <IconComponent size={28} strokeWidth={2} />
                </BenefitIcon>
                <BenefitContent>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                </BenefitContent>
              </BenefitCard>
            );
          })}
        </BenefitsGrid>
      </ContentContainer>
    </Container>
  );
};

export default Plataformas;