use solana_program::{program_error::ProgramError};
use std::convert::TryInto;

pub enum BridgeInstruction {
    Mint { amount: u64 },
    Burn { amount: u64 },
}

pub fn parse_instruction(data: &[u8]) -> Result<BridgeInstruction, ProgramError> {
    let (&tag, rest) = data
        .split_first()
        .ok_or(ProgramError::InvalidInstructionData)?;

    match tag {
        0 => {
            let amount = rest
                .get(..8)
                .and_then(|slice| slice.try_into().ok())
                .map(u64::from_le_bytes)
                .ok_or(ProgramError::InvalidInstructionData)?;
            Ok(BridgeInstruction::Mint { amount })
        }
        1 => {
            let amount = rest
                .get(..8)
                .and_then(|slice| slice.try_into().ok())
                .map(u64::from_le_bytes)
                .ok_or(ProgramError::InvalidInstructionData)?;
            Ok(BridgeInstruction::Burn { amount })
        }
        _ => Err(ProgramError::InvalidInstructionData),
    }
}
