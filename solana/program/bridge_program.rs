use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

pub mod utils;
use utils::{BridgeInstruction, parse_instruction};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = parse_instruction(instruction_data)?;
    let accounts_iter = &mut accounts.iter();

    match instruction {
        BridgeInstruction::Mint { amount } => {
            let user_account = next_account_info(accounts_iter)?;
            msg!("Minting {} wUSD to {}", amount, user_account.key);
            // Add your CPI or Token Program logic here
        }
        BridgeInstruction::Burn { amount } => {
            let user_account = next_account_info(accounts_iter)?;
            msg!("Burning {} wUSD from {}", amount, user_account.key);
            // Add burn logic here
        }
    }

    Ok(())
}
