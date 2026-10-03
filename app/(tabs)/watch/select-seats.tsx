import Button from "@/components/Button";
import { wp } from "@/components/ScreenContainer";
import {
  DATES,
  MOVIE,
  PRICES,
  SEAT_ROWS,
  SHOWTIMES,
  colors,
  seatColor,
  type Seat,
} from "@/constants/booking.data";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLS = 24;
const LABEL_W = 18;
const AISLE = 14;
const GAP = 4;

export default function SelectSeatsScreen() {
  const { dateId, showtimeId } = useLocalSearchParams<{
    dateId?: string;
    showtimeId?: string;
  }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const date = DATES.find((d) => d.id === dateId) ?? DATES[0];
  const show = SHOWTIMES.find((x) => x.id === showtimeId) ?? SHOWTIMES[0];

  const [selected, setSelected] = useState<Seat[]>(() => {
    const seat = SEAT_ROWS[2].sections[1].find((c) => c?.available);
    return seat ? [seat] : [];
  });
  const isSelected = (id: string) => selected.some((x) => x.id === id);
  const toggle = (seat: Seat) =>
    setSelected((prev) =>
      prev.some((x) => x.id === seat.id)
        ? prev.filter((x) => x.id !== seat.id)
        : [...prev, seat],
    );
  const total = selected.reduce((sum, x) => sum + PRICES[x.type], 0);

  const padX = 16 + Math.max(insets.left, insets.right);
  const mapW = isLandscape
    ? Math.floor((width - padX * 2) * 0.62)
    : width - padX * 2;
  const size = Math.max(
    8,
    Math.floor((mapW - LABEL_W - AISLE * 2) / COLS) - GAP,
  );

  const seatMap = (
    <View style={{ alignItems: "center" }}>
      <View style={styles.screenArc}>
        <Text style={styles.screenText}>SCREEN</Text>
      </View>
      {SEAT_ROWS.map((r) => (
        <View
          key={r.row}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={[styles.rowLabel, { width: LABEL_W }]}>{r.row}</Text>
          {r.sections.map((sec, i) => (
            <View
              key={i}
              style={{ flexDirection: "row", marginLeft: i ? AISLE : 0 }}
            >
              {sec.map((c, j) =>
                c ? (
                  <Pressable
                    key={c.id}
                    disabled={!c.available}
                    onPress={() => toggle(c)}
                    style={{
                      width: size,
                      height: size,
                      margin: GAP / 2,
                      borderRadius: 3,
                      backgroundColor: seatColor(c, isSelected(c.id)),
                    }}
                  />
                ) : (
                  <View
                    key={j}
                    style={{ width: size, height: size, margin: GAP / 2 }}
                  />
                ),
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const legend = [
    { label: "Selected", color: colors.selected },
    { label: "Not available", color: colors.unavailable },
    { label: `VIP (${PRICES.vip}$)`, color: colors.vip },
    { label: `Regular (${PRICES.regular} $)`, color: colors.blue },
  ];

  const info = (
    <View style={styles.panel}>
      <View style={styles.legend}>
        {legend.map((l) => (
          <View
            key={l.label}
            style={[styles.legendItem, { width: isLandscape ? "100%" : "50%" }]}
          >
            <View style={[styles.legendBox, { backgroundColor: l.color }]} />
            <Text style={styles.legendText}>{l.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chips}>
        {selected.map((x) => (
          <View key={x.id} style={styles.seatChip}>
            <Text style={styles.chipBig}>{x.number}</Text>
            <Text style={styles.chipSmall}> / {x.row} row</Text>
            <TouchableOpacity onPress={() => toggle(x)} hitSlop={8}>
              <Feather
                name="x"
                size={16}
                color={colors.text}
                style={{ marginLeft: 14 }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.head,
          {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.headRow}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Feather name="chevron-left" size={26} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>{MOVIE.title}</Text>
          <Text style={styles.subtitle}>
            {date.full} | {show.time} {show.hall}
          </Text>
        </View>
      </View>

      {isLandscape ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 16,
            paddingHorizontal: padX,
          }}
        >
          <ScrollView
            style={{ width: mapW }}
            contentContainerStyle={{ paddingVertical: 20 }}
          >
            {seatMap}
          </ScrollView>
          <View style={{ flex: 1, paddingBottom: insets.bottom + 12 }}>
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
              {info}
            </ScrollView>
            <View
              style={[
                styles.seatprice,
                { flexDirection: "column", paddingTop: 5 },
              ]}
            >
              <View style={[styles.price, { width: wp(40) }]}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: "#202C43", textAlign: "center" },
                  ]}
                >
                  {total ? `Total Price  ${total}$` : "Total Price "}
                </Text>
              </View>
              <Button
                btntitle="Procced to pay"
                bgc={Colors.btnbg}
                width={wp(40)}
              />
            </View>
          </View>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: padX,
              paddingVertical: 20,
              gap: 20,
            }}
          >
            {seatMap}
            {info}
          </ScrollView>
          <View
            style={{
              paddingHorizontal: padX,
              paddingTop: 12,
              paddingBottom: insets.bottom + 12,
            }}
          >
            <View style={styles.seatprice}>
              <View style={styles.price}>
                <Text
                  style={[
                    styles.buttonText,
                    { color: "#202C43", textAlign: "center" },
                  ]}
                >
                  {total ? `Total Price  ${total}$` : "Total Price "}
                </Text>
              </View>
              <Button btntitle="Procced to pay" bgc={Colors.btnbg} />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  head: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headRow: { height: 68, justifyContent: "center", alignItems: "center" },
  back: { position: "absolute", left: 16, top: 22 },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
    fontFamily: "Poppins-Medium",
  },
  subtitle: { fontSize: 13, color: colors.blue, marginTop: 4 },
  screenArc: {
    width: "90%",
    height: 30,
    marginBottom: 18,
    borderTopWidth: 1,
    borderColor: colors.blue,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  screenText: {
    fontSize: 9,
    color: colors.muted,
    fontFamily: "Poppins-Medium",
  },
  rowLabel: {
    fontSize: 8,
    color: colors.text,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  panel: { backgroundColor: "#fff", borderRadius: 12, padding: 20, gap: 24 },
  legend: { flexDirection: "row", flexWrap: "wrap", rowGap: 18 },
  legendItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  legendBox: { width: 22, height: 20, borderRadius: 4 },
  legendText: {
    fontSize: 14,
    color: colors.muted,
    fontFamily: "Poppins-Medium",
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  seatChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.chip,
  },
  seatprice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    width: 90,
    height: 50,
    backgroundColor: "#A6A6A61A",
    borderRadius: 8,
    paddingTop: 8,
  },
  chipBig: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.text,
    fontFamily: "Poppins-Medium",
  },
  chipSmall: { fontSize: 13, color: colors.text, fontFamily: "Poppins-Medium" },
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "Poppins-Medium",
  },
});
