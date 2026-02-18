---
title: "Ergonomic CLI Patterns in Rust"
description: "Practical patterns for building polished, user-friendly command-line tools in Rust — argument parsing, error handling, progress bars, and more."
date: 2024-02-10
tags: ["Rust", "CLI", "Tutorial", "Tools"]
image: "/images/blog-rust-cli.png"
imageAlt: "Terminal with Rust code"
relatedProjects: ["cli-task-manager"]
---

# Ergonomic CLI Patterns in Rust

Rust's performance and reliability make it an excellent choice for CLI tools. But writing a *polished* CLI — one that handles errors gracefully, provides helpful output, and feels fast — requires knowing the right patterns and crates. Let's dig in.

## Argument Parsing with `clap`

`clap` v4 uses a derive macro that keeps your arg definitions co-located with their types:
```rust
use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "task", about = "A blazing-fast task manager", version)]
struct Cli {
    /// Increase verbosity (-v, -vv, -vvv)
    #[arg(short, long, action = clap::ArgAction::Count)]
    verbose: u8,

    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Add a new task
    Add {
        /// Task description
        description: String,
        /// Priority (low, medium, high)
        #[arg(short, long, default_value = "medium")]
        priority: String,
    },
    /// List all tasks
    List {
        /// Filter by tag
        #[arg(short, long)]
        tag: Option<String>,
    },
}
```

## Structured Error Handling with `anyhow` + `thiserror`

Use `thiserror` for library-level errors and `anyhow` for application-level error propagation:
```rust
use thiserror::Error;
use anyhow::{Context, Result};

#[derive(Error, Debug)]
pub enum TaskError {
    #[error("Task with id {0} not found")]
    NotFound(u64),
    #[error("Database error: {0}")]
    Database(#[from] rusqlite::Error),
}

fn complete_task(db: &Database, id: u64) -> Result<()> {
    let task = db.get_task(id)
        .context("Failed to fetch task from database")?;

    if task.is_none() {
        return Err(TaskError::NotFound(id).into());
    }

    db.mark_complete(id)
        .with_context(|| format!("Failed to mark task {id} as complete"))?;

    println!("✓ Task {id} completed");
    Ok(())
}
```

## Progress Indicators with `indicatif`

Long-running operations deserve visual feedback:
```rust
use indicatif::{ProgressBar, ProgressStyle};
use std::time::Duration;

fn sync_tasks(count: u64) {
    let pb = ProgressBar::new(count);
    pb.set_style(
        ProgressStyle::with_template(
            "{spinner:.green} [{elapsed_precise}] [{bar:40.cyan/blue}] {pos}/{len} {msg}"
        )
        .unwrap()
        .progress_chars("█▉▊▋▌▍▎▏  "),
    );

    for i in 0..count {
        // Simulate work
        std::thread::sleep(Duration::from_millis(20));
        pb.set_message(format!("Syncing task {i}"));
        pb.inc(1);
    }

    pb.finish_with_message("Sync complete ✓");
}
```

## Color Output with `colored`
```rust
use colored::Colorize;

fn print_task(task: &Task) {
    let priority_label = match task.priority.as_str() {
        "high"   => "HIGH  ".red().bold(),
        "medium" => "MED   ".yellow(),
        _        => "LOW   ".dimmed(),
    };

    println!(
        "[{}] {} {}",
        priority_label,
        task.id.to_string().dimmed(),
        task.description.white()
    );
}
```

## Key Patterns Summary

- **`clap` derive API** keeps args readable and auto-generates `--help`
- **`thiserror` + `anyhow`** give you typed errors at the library boundary and easy propagation in main
- **`indicatif`** adds progress bars and spinners with minimal code
- **`colored`** or `owo-colors` for cross-platform terminal color
- Always check `atty::is(atty::Stream::Stdout)` before emitting ANSI codes in pipeable output

The full source for my task manager project puts all these patterns together — check it out!