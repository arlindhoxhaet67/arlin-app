import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import {
  AvatarAccount,
  AvatarAccountVariant,
  Box,
  ButtonBase,
  ButtonBaseSize,
  IconName,
  Text,
} from '../../component-library';
import {
  AlignItems,
  BackgroundColor,
  BorderRadius,
  Display,
  FlexDirection,
  IconColor,
  Size,
  TextColor,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { getUseBlockie } from '../../../selectors';
import { shortenAddress } from '../../../helpers/utils/util';
import { trace, TraceName } from '../../../../shared/lib/trace';

export const AccountPicker = ({
  address,
  name,
  onClick,
  disabled = false,
  showAddress = false,
  addressProps = {},
  labelProps = {},
  textProps = {},
  className = '',
  ...props
}) => {
  const useBlockie = useSelector(getUseBlockie);
  const shortenedAddress = shortenAddress(toChecksumHexAddress(address));

  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      alignItems={AlignItems.center}
    >
      <ButtonBase
        className={classnames('multichain-account-picker', className)}
        data-testid="account-menu-icon"
        onClick={() => {
          trace({ name: TraceName.AccountList });
          onClick();
        }}
        backgroundColor={BackgroundColor.transparent}
        borderRadius={BorderRadius.LG}
        ellipsis
        textProps={{
          display: Display.Flex,
          alignItems: AlignItems.center,
          gap: 2,
          ...textProps,
        }}
        size={showAddress ? ButtonBaseSize.Lg : ButtonBaseSize.Sm}
        disabled={disabled}
        endIconName={IconName.ArrowDown}
        endIconProps={{
          color: IconColor.iconDefault,
          size: Size.SM,
        }}
        {...props}
        gap={1}
      >
        <Box
          display={Display.Flex}
          flexDirection={
            process.env.REMOVE_GNS ? FlexDirection.Column : FlexDirection.Row
          }
          alignItems={AlignItems.center}
          gap={process.env.REMOVE_GNS ? 0 : 2}
        >
          {process.env.REMOVE_GNS ? null : (
            <AvatarAccount
              variant={
                useBlockie
                  ? AvatarAccountVariant.Blockies
                  : AvatarAccountVariant.Jazzicon
              }
              address={address}
              size={showAddress ? Size.MD : Size.XS}
              borderColor={BackgroundColor.backgroundDefault}
            />
          )}
          <Text
            as="span"
            ellipsis
            {...labelProps}
            className={classnames(
              'multichain-account-picker__label',
              labelProps.className ?? '',
            )}
          >
            {name}
            {showAddress ? (
              <Text
                color={TextColor.textAlternative}
                variant={TextVariant.bodySm}
                ellipsis
                {...addressProps}
              >
                {shortenedAddress}
              </Text>
            ) : null}
          </Text>
        </Box>
      </ButtonBase>
    </Box>
  );
};

AccountPicker.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  showAddress: PropTypes.bool,
  addressProps: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  labelProps: PropTypes.object,
  textProps: PropTypes.object,
  className: PropTypes.string,
};
