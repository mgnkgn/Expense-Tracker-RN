package main

import "github.com/google/uuid"

type Transaction struct {
	ID     string `json:"id"`
	Amount int    `json:"amount"`
	Type   string `json:"type"`
	Date   string `json:"date"`
	Color  string `json:"color"`
	Name   string `json:"name"`
	User   *User  `json:"user"`
}

type User struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
	Pass string    `json:"-"`
}
