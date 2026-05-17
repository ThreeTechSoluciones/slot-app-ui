import styled, { css } from 'styled-components';
import {
  BRAND_COLOR,
  DEFAULT_FONT_SIZE,
  MEDIUM_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '../../utils/Stylesheet';

export const HEIGHT_HEADER = '96px';
export const TEXT_COLOR = 'rgba(0, 0, 0, 1)';
export const TEXT_COLOR_MUTED = 'rgba(0, 0, 0, 0.75)';

interface OptionProps {
  $isActive?: boolean;
}

const responsiveText = css`
  @media (max-width: 1080px) {
    font-size: ${MEDIUM_FONT_SIZE};
  }
`;

const optionResponsiveWidth = css`
  @media (max-width: 1080px) {
    width: 120px;
  }
  @media (max-width: 930px) {
    width: 100px;
  }
  @media (max-width: 805px) {
    width: 90px;
  }
  @media (max-width: 685px) {
    width: 85px;
  }
`;

const buttonResponsiveWidth = css`
  @media (max-width: 1080px) {
    width: 122px;
    padding: 0px 2px 0px 6px;
  }
`;

const opacityHover = css`
  color: ${TEXT_COLOR_MUTED};
  transition: color 0.2s ease;
  &:hover {
    color: ${TEXT_COLOR};
  }
`;

export const MainContainer = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${HEIGHT_HEADER};
  background-color: ${BRAND_COLOR};
  box-sizing: border-box;
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 1005;
`;

export const LeftOptionsContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: ${HEIGHT_HEADER};
  font-size: ${DEFAULT_FONT_SIZE};
  margin-left: clamp(8px, 3vw, 80px);
`;

export const RightOptionsContainer = styled(LeftOptionsContainer)`
  gap: 30px;
  margin-left: 0;
  margin-right: clamp(8px, 3vw, 80px);
`;

const BaseOption = styled.div<OptionProps>`
  font-size: ${DEFAULT_FONT_SIZE};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 16px;
  cursor: pointer;
  width: 140px;
  ${opacityHover}
  ${responsiveText}
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${TEXT_COLOR};
    `}
`;

export const Option = styled(BaseOption)<OptionProps>`
  ${optionResponsiveWidth}
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    transform: translateX(-50%);
    height: 2px;
    background: ${TEXT_COLOR};
    transition: width 0.3s ease;
    width: ${({ $isActive }) => ($isActive ? '70%' : '0')};
  }
  &:hover::after {
    width: 70%;
  }
`;

export const Button = styled(BaseOption)<OptionProps>`
  ${buttonResponsiveWidth}
  margin-left: 20px;
  padding: 2px 4px 2px 8px;
  background-color: ${BRAND_COLOR};
  border: 2px solid ${TEXT_COLOR_MUTED};
  border-radius: 12px;
  gap: 6px;
  @media (max-width: 1080px) {
    img {
      width: 8px;
      height: 8px;
    }
  }
  &:hover {
    border-color: ${TEXT_COLOR};
    img {
      opacity: 1;
    }
  }
  img {
    opacity: 0.75;
    transition: opacity 0.2s ease;
  }
  ${({ $isActive }) =>
    $isActive &&
    css`
      border-color: ${TEXT_COLOR};
      img {
        opacity: 1;
      }
    `}
`;

const BasePhoto = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Logo = styled(BasePhoto)`
  margin-right: 20px;
`;

export const Photo = styled(BasePhoto)`
  border: 2px solid ${TEXT_COLOR};
  @media (max-width: 1180px) {
    display: none;
  }
`;

export const Logout = styled.div`
  ${opacityHover}
  display: flex;
  align-items: center;
  gap: 4px;
  width: 88px;
  min-height: 54px;
  line-height: 16px;
  cursor: pointer;
  @media (max-width: 890px) {
    margin-left: clamp(0px, calc((1200px - 100vw) * 0.1), 30px);
  }
  img {
    width: 34px;
    height: 34px;
    opacity: 0.75;
    transition: opacity 0.2s ease;
    flex-shrink: 0;
    @media (max-width: 1200px) {
      width: 24px;
      height: 24px;
    }
  }
  &:hover {
    border-color: ${TEXT_COLOR};
    img {
      opacity: 1;
    }
  }
`;

export const LogoutText = styled.span`
  font-size: ${DEFAULT_FONT_SIZE};
  white-space: nowrap;
  ${responsiveText}
  @media (max-width: 740px) {
    display: none;
  }
`;
