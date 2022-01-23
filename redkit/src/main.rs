use clap::Parser;
use std::collections::HashMap;
use std::fs::OpenOptions;
use std::io::{Error, Write};
use std::{io, process};

/// A tool for creating new Sveltekit/Redis entities
#[derive(Parser)]
struct Cli {
    /// The name of your new entity
    #[clap(long, short)]
    name: String,

    /// Scheme of the data (string, number, boolean, array)
    /// In the format of:
    /// name: string, isTrue: boolean, ... and so on
    #[clap(long, short)]
    scheme: String,
}

fn create_entity_from_string(input: String) -> HashMap<String, String> {
    let mut entity: HashMap<String, String> = HashMap::new();
    let vec: Vec<&str> = input.split(",").map(|s| s.trim()).collect();
    for i in vec {
        let key_val: Vec<&str> = i.split(":").map(|x| x.trim()).collect();
        if key_val.len() == 2 {
            entity.insert(key_val[0].to_string(), key_val[1].to_string());
        }
    }
    entity
}

fn create_utils_file(name: &str, entity: &HashMap<String, String>) {
    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .create(true)
        .open(name)
        .unwrap();

    if let Err(e) = writeln!(file, "{:?}", entity) {
        eprintln!("unable to write to {}", e);
    }
}

fn main() {
    let args = Cli::parse();

    println!("{}", args.name);

    let entity = create_entity_from_string(args.scheme);
    println!("Result: {:?}", entity);

    create_utils_file(args.name.as_str(), &entity);
}
