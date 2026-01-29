import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const MainTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 0%, rgb(233, 90, 12) 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const PlatformsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PlatformCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem 2rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%);
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
 
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgb(233, 90, 12) 0%, #dc2626 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);

`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const FeaturesSection = styled.div`
  text-align: center;
  margin-top: 4rem;
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureItem = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 50px;
  padding: 1rem 2rem;
  color: #ffffff;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
    border-color: rgb(233, 90, 12);
    
  }
`;

export const Platforms = () => {
  const platforms = [
    {
      icon: '🌐',
      title: 'Experiencia Web',
      description: 'Interfaz optimizada para navegadores modernos con funcionalidades avanzadas y diseño responsivo'
    },
    {
      icon: '📱',
      title: 'Aplicación Móvil',
      description: 'Apps nativas para iOS y Android con sincronización en tiempo real y notificaciones push'
    },
    {
      icon: '💻',
      title: 'Suite de Escritorio',
      description: 'Aplicaciones completas para Windows y macOS con integración profunda del sistema'
    }
  ];

  const features = ['Sincronización Automática', 'Modo Offline', 'Seguridad Avanzada', 'Actualizaciones Instantáneas'];

  return (
    <Container>
      <ContentWrapper>
        <HeaderSection>
          <MainTitle>Multiplataforma Total</MainTitle>
          <Subtitle>
            Accede desde cualquier dispositivo y mantén tu trabajo sincronizado en tiempo real
          </Subtitle>
        </HeaderSection>
        
        <PlatformsGrid>
          {platforms.map((platform, index) => (
            <PlatformCard key={index}>
              <IconContainer>
                <span>{platform.icon}</span>
              </IconContainer>
              <CardTitle>{platform.title}</CardTitle>
              <CardDescription>{platform.description}</CardDescription>
            </PlatformCard>
          ))}
        </PlatformsGrid>
        
        <FeaturesSection>
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                {feature}
              </FeatureItem>
            ))}
          </FeaturesList>
        </FeaturesSection>
      </ContentWrapper>
    </Container>
  );
};