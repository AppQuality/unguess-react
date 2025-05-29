import { useFormikContext } from 'formik';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useMemo, useState } from 'react';
import logoImgs from 'src/assets/join-loghi.png';
import joinImg1 from 'src/assets/join-step-1.svg';
import joinImg2 from 'src/assets/join-step-2.png';
import joinImg2webp from 'src/assets/join-step-2.webp';
import joinImg3 from 'src/assets/join-step-3.png';
import joinImg3webp from 'src/assets/join-step-3.webp';
import styled from 'styled-components';
import { JoinFormValues } from './valuesType';

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.space.xl} * 2);
  overflow: hidden;
`;

export const ImagesColumn = () => {
  const { values } = useFormikContext<JoinFormValues>();
  const [step, setStep] = useState(values.step);
  const forwardAnimation = useMemo(
    () => values.step - step * 10,
    [values.step, step]
  );
  useEffect(() => {
    setStep(values.step);
  }, [values.step]);
  return (
    <ImagesWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: forwardAnimation, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -forwardAnimation, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <picture>
              <source srcSet={joinImg1} type="image/webp" />
              <img src={joinImg1} alt="Unguess Join Step 1" />
            </picture>
          )}
          {step === 2 && (
            <picture>
              <source srcSet={joinImg2webp} type="image/webp" />
              <img src={joinImg2} alt="Unguess Join Step 2" />
            </picture>
          )}
          {step === 3 && (
            <picture>
              <source srcSet={joinImg3webp} type="image/webp" />
              <img src={joinImg3} alt="Unguess Join Step 3" />
            </picture>
          )}
        </motion.div>
      </AnimatePresence>
      {step === 1 && (
        <img
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
          className="partners-img"
          src={logoImgs}
          alt="Unguess partners"
        />
      )}
    </ImagesWrapper>
  );
};
